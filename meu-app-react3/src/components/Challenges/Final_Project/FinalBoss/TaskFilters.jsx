import React from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import { useTasks } from "../../../../contexts/Final_Project/useTasks";

const TaskFilters = () => {
  const { filter, setFilter, stats } = useTasks();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
      <ButtonGroup variant="contained" aria-label="filtro de tarefas">
        <Button
          onClick={() => setFilter("all")}
          color={filter === "all" ? "primary" : "inherit"}
        >
          Todas ({stats.total})
        </Button>
        <Button
          onClick={() => setFilter("active")}
          color={filter === "active" ? "warning" : "inherit"}
        >
          Pendentes ({stats.active})
        </Button>
        <Button
          onClick={() => setFilter("completed")}
          color={filter === "completed" ? "success" : "inherit"}
        >
          Concluídas ({stats.completed})
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default TaskFilters;
