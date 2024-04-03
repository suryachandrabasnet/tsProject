import app from "./app";
import connection from "./database/sequelizeConnection";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connection();
