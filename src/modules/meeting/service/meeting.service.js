const { Op } = require("sequelize");
const Meeting = require("../model/meeting.model");


async function hasConflict({ userId, startTime, endTime, excludeId }) {
return Meeting.findOne({
where: {
userId,
...(excludeId ? { id: { [Op.ne]: excludeId } } : {}),
startTime: { [Op.lt]: endTime },
endTime: { [Op.gt]: startTime }
}
});
}


exports.createMeeting = async (data) => {
if (new Date(data.startTime) >= new Date(data.endTime)) {
const err = new Error("startTime must be before endTime");
err.status = 400;
throw err;
}


const conflict = await hasConflict(data);
if (conflict) {
const err = new Error("Time slot already booked");
err.status = 400;
throw err;
}


return Meeting.create(data);
};


exports.getMeetings = async (query) => {
const where = {};
if (query.userId) where.userId = query.userId;
return Meeting.findAll({ where });
};


exports.getMeetingById = async (id) => {
return Meeting.findByPk(id);
};


exports.updateMeeting = async (id, data) => {
const meeting = await Meeting.findByPk(id);
if (!meeting) return null;


const conflict = await hasConflict({
userId: meeting.userId,
startTime: data.startTime,
endTime: data.endTime,
excludeId: id
});


if (conflict) {
const err = new Error("Time slot already booked");
err.status = 400;
throw err;
}


return meeting.update(data);
};


exports.deleteMeeting = async (id) => {
const meeting = await Meeting.findByPk(id);
if (!meeting) return null;
await meeting.destroy();
return true;
};