import express from 'express';

const app = express();

app.get("/", (req, res) => {
      res.status(200).json({
            success: true,
            message: "FlashChat App Server"
      })
})

app.listen(3000, () => console.log(`Server running on port 3000`));