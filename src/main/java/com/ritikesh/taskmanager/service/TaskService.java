package com.ritikesh.taskmanager.service;

import com.ritikesh.taskmanager.model.Task;
import com.ritikesh.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Add a new task
    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    // Delete task by id
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    // Update task by id
    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id));

        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setCompleted(taskDetails.isCompleted());

        return taskRepository.save(task);
    }
}


