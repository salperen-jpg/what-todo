import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: [true, "Please provide todo!"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Todo", todoSchema);

/*
isCompleted:boolean,
todo:string,
createdAt: date,
coming up
isNotified:boolean,
whenToNotified:date,
*/
