function toggleLineThrough(checkbox) {
  let p = checkbox.parentElement.parentElement.querySelector("p");
  let taskDate = checkbox.parentElement.parentElement.querySelector(".created-date");
  let originalDate = taskDate.dataset.originalDate;

  if (checkbox.checked) {
    p.classList.add("task-done");
    taskDate.innerHTML = "Task Completed."
  } else {
    p.classList.remove("task-done");
    taskDate.innerHTML = originalDate;
  }
}
