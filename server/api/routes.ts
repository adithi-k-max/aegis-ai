import { Router } from 'express';
import { getPlantState } from '../simulation/state';
import { askCopilot } from '../services/copilot';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.get('/dashboard', (req, res) => {
  res.json(getPlantState());
});

router.post('/copilot', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await askCopilot(message, getPlantState());
    res.json({ response });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Other endpoints for specific entities
router.get('/zones', (req, res) => { res.json(getPlantState().zones); });
router.get('/workers', (req, res) => { res.json(getPlantState().workers); });
router.get('/permits', (req, res) => { res.json(getPlantState().permits); });

export default router;
