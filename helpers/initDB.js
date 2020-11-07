import mongoose from 'mongoose';

// mongoose.connect("mongodb://localhost:27017/pmdeveloper"

function initDB() {
    if (mongoose.connections[0].readyState) {
        console.log("already connected");
        return;
    }
    mongoose.connect("mongodb://localhost:27017/pmstore", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false
    })
    mongoose.connection.on("connected", () => {
        console.log("Connected to mongodb");
    })
    mongoose.connection.on("error", (err) => {
        console.log("error in connecting", err);
    })
}


export default initDB;