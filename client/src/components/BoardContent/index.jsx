import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { updateColumn } from "../../redux/thunk/column";
import { updateProjectColumnOrder } from "../../redux/thunk/project";
import Column from "../Column";
import Spinner from "../Loading/Spinner";
import "./style.scss";

const BoardContend = () => {
  const { data: project } = useSelector((state) => state.project);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    if (type === "task") {
      let cloneProject = JSON.parse(JSON.stringify(project));
      if (destination.droppableId === source.droppableId) {
        let dragColumn = cloneProject.columns.find(
          (e) => e._id === destination.droppableId
        );
        let nameTask = dragColumn.tasks.find(
          (e) => e._id === dragColumn.taskOrder[source.index]
        ).title;
        dragColumn.taskOrder.splice(source.index, 1);
        dragColumn.taskOrder.splice(destination.index, 0, draggableId);
        const data = {
          title: dragColumn.title,
          taskOrder: [...dragColumn.taskOrder],
          tasks: dragColumn.tasks.map((el) => el._id),
        };
        let content = `changed the position of task ${nameTask} in column ${dragColumn.title}`;
        dispatch(
          updateColumn({
            token: auth.token,
            sourceColumnData: {
              id: dragColumn._id,
              data,
            },
            idProject: project._id,
            content,
          })
        );
      } else {
        let sourceColumn = cloneProject.columns.find(
          (e) => e._id === source.droppableId
        );
        let desColumn = cloneProject.columns.find(
          (e) => e._id === destination.droppableId
        );
        let nameTask = sourceColumn.tasks.find(
          (e) => e._id === sourceColumn.taskOrder[source.index]
        ).title;
        sourceColumn.taskOrder.splice(source.index, 1);
        let dragTask = sourceColumn.tasks.find((e) => e._id === draggableId);
        desColumn.taskOrder.splice(destination.index, 0, draggableId);
        desColumn.tasks.push(dragTask);

        const dataSource = {
          title: sourceColumn.title,
          taskOrder: [...sourceColumn.taskOrder],
          tasks: sourceColumn.tasks
            .filter((e) => e._id !== draggableId)
            .map((e) => e._id),
        };

        const dataDes = {
          title: desColumn.title,
          taskOrder: [...desColumn.taskOrder],
          tasks: desColumn.tasks.map((e) => e._id),
        };
        let content = `moved task ${nameTask} from column ${sourceColumn.title} to column ${desColumn.title}`;
        dispatch(
          updateColumn({
            token: auth.token,
            sourceColumnData: {
              id: sourceColumn._id,
              data: dataSource,
            },
            desColumnData: {
              id: desColumn._id,
              data: dataDes,
            },
            idProject: project._id,
            content,
          })
        );
      }
    } else if (type === "column") {
      let cloneProject = JSON.parse(JSON.stringify(project));
      const nameColumn = cloneProject.columns.find(
        (e) => e._id === cloneProject.columnOrder[source.index]
      ).title;
      cloneProject.columnOrder.splice(source.index, 1);
      cloneProject.columnOrder.splice(destination.index, 0, draggableId);
      let content = `moved the position of column ${nameColumn}`;
      dispatch(
        updateProjectColumnOrder({
          data: { columnOrder: [...cloneProject.columnOrder] },
          token: auth.token,
          id: project._id,
          content,
        })
      );
    } else {
      return;
    }
  }

  if (!project) {
    return <Spinner />;
  }

  return (
    <div className="board-content">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="list-column"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {project?.columnOrder
                .map((id) => project.columns.find((e) => e._id === id))
                .map((e, i) => (
                  <Column key={e._id} column={e} index={i} />
                ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default BoardContend;
