import app from "./app";
import sequelizeConnection from "./database/sequelizeConnection";

const PORT = process.env.PORT || 3000;

sequelizeConnection.authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Server issue", err);
  });
