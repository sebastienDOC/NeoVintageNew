const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback.model');

// Récupérer tous les avis
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .sort({ date: -1 }) // Du plus récent au plus ancien
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ajouter un nouvel avis
router.post('/', async (req, res) => {
  const feedback = new Feedback({
    authorInitials: req.body.authorInitials,
    rating: req.body.rating,
    productName: req.body.productName,
    comment: req.body.comment,
    verified: true,
  });

  try {
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtenir les statistiques
router.get('/stats', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    const totalCount = feedbacks.length;
    const sum = feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalCount ? sum / totalCount : 0;

    const ratingDistribution = await Feedback.aggregate([
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      averageRating,
      totalCount,
      ratingDistribution: ratingDistribution.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {})
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Supprimer un avis (optionnel, pour modération)
router.delete('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Avis non trouvé" });
    }
    await feedback.remove();
    res.json({ message: "Avis supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;