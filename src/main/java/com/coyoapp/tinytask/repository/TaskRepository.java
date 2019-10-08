package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Task;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, String> {

	Collection<Task> findAllByOrderByDoneAsc();
	
}
