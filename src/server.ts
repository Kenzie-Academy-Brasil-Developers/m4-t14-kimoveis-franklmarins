import app from "./app";
import { AppDataSource } from "./data-source";
import "dotenv/config";

const PORT = Number(process.env.PORT) || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
