const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    data: {
      message: {
        type: String,
        required: true,
      },
      users: Array,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Messages', messageSchema);
