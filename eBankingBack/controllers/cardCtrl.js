
const Card = require('../models/Card');

async function createCard(req, res) {
  try {
    const card = new Card(req.body);
    await card.save();
    res.status(201).json({ success: true, card });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getUserCards(req, res) {
  try {
    const cards = await Card.find({ userId: req.params.userId });
    res.json({ success: true, cards });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getCard(req, res) {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ success: false, message: 'Card not found' });
    res.json({ success: true, card });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function updateCard(req, res) {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!card) return res.status(404).json({ success: false, message: 'Card not found' });
    res.json({ success: true, card });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function deleteCard(req, res) {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ success: false, message: 'Card not found' });
    res.json({ success: true, message: 'Card deleted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

module.exports = {
  createCard,
  getUserCards,
  getCard,
  updateCard,
  deleteCard
};
