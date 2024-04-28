const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const farmerRoute = require("./routes/farmers.js");
const engineerRoute = require("./routes/engineers.js");
const sharedLandRoute = require("./routes/sharedLands.js");
const purchaseRoute = require("./routes/purchases.js");
const reportRoute = require("./routes/reports.js");
const refundRoute = require("./routes/refunds.js");
const endYearReportRoute = require("./routes/endYearReports.js");
const soilAnalysisRoute = require("./routes/soilAnalyses.js");
const leafAnalysisRoute = require("./routes/leafAnalyses.js");

const app = express();

const cors = require("cors");

dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGODB_URI).then(
        console.log("connected to db")
    ).catch( (err) => {
        console.log(err);
    })
}

app.use(cors());
app.use(express.json());

app.use("/api/farmers", farmerRoute);
app.use("/api/engineers", engineerRoute);
app.use("/api/sharedLands", sharedLandRoute);
app.use("/api/purchases", purchaseRoute);
app.use("/api/reports", reportRoute);
app.use("/api/refunds", refundRoute);
app.use("/api/endYearReports", endYearReportRoute);
app.use("/api/soilAnalyses", soilAnalysisRoute);
app.use("/api/leafAnalyses", leafAnalysisRoute);


app.listen(process.env.PORT, () => {
    connect();
    console.log("connected to server");
});




