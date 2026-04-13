import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// 存储问卷结果
const results = [];

app.use(cors());
app.use(express.json());

// 提交问卷答案
app.post('/api/submit', (req, res) => {
  const submission = {
    ...req.body,
    submittedAt: new Date().toISOString()
  };
  results.push(submission);
  console.log('收到新提交:', submission);
  res.json({ success: true, message: '问卷已提交', data: submission });
});

// 获取所有结果
app.get('/api/results', (req, res) => {
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
