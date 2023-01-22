const Message = require('../model/messageModel');

module.exports.sendMessage = async (req, res) => {
  try {
    const { message, from, to } = req.body;
    const sent = await Message.create({
      data: {
        message,
        users: [from, to],
        sender: from,
      },
    });
    res.json(sent ? { status: 'success' } : { status: 'failed' });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllMessages = async (req, res) => {
  try {
    const { from, to } = req.body;
    const getMesssages = await Message.find({
      'data.users': { $all: [from, to] },
    }).sort({ updatedAt: 1 });
    const allMessages = getMesssages.map((msg) => {
      const timeStamp = msg._id.getTimestamp();
      return {
        timeStamp: `${timeStamp.getFullYear()}/${
          timeStamp.getMonth() + 1
        }/${timeStamp.getDate()} > ${timeStamp.getHours()}:${
          (timeStamp.getMinutes() < 10 ? '0' : '') + timeStamp.getMinutes()
        }`,
        ownMessage: msg.data.sender == from,
        message: msg.data.message,
      };
    });
    res.json(allMessages);
  } catch (error) {
    console.log(error);
  }
};
