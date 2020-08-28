import { Router, Request, Response } from "express";

// Model
import Task from "../models/Tasks";
const router = Router();

router
  .route("/create")
  .get((req: Request, res: Response) => {
    res.render("tasks/create");
  })
  .post(async (req: Request, res: Response) => {
    const { title, description } = req.body;
    console.log(title, description);
    const newTask = new Task({ title, description });
    await newTask.save();

    res.redirect("/tasks/list");
  });

router.route("/list").get(async (req: Request, res: Response) => {
  const tasks = await Task.find();
  console.log(tasks);

  res.render("tasks/list", { tasks });
});

router.route("/delete/:id").get(async (req: Request, res: Response) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);

  res.redirect("/tasks/list");
});

router.route("/edit/:id").get(async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  console.log(task);
  res.render("tasks/edit", { task });
}).post(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;
    console.log(title, description);
    await Task.findByIdAndUpdate(id, { title, description });
    res.redirect("/tasks/list");
  });

/* router.get('/create', (req: Request, res: Response) => {
    res.render('')
}) */

export default router;
