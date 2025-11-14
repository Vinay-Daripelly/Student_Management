import Student from "../models/studentModel.js";

export const createStudent = async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
};

export const getStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students);
};

export const updateStudent = async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
};

export const deleteStudent = async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
};
