
package com.ritikesh.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ritikesh.taskmanager.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
