import { GenericButton } from '@components/buttons';
import { ModalFormBg } from '@components/forms';
import ExerciseTable from '@components/utils/ExerciseTable';
import formatDate from '@utils/formatDate';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import { type Workout } from 'src/customTypes';

interface ActivityProps {
  workout: Workout;
}

const Activity: React.FC<ActivityProps> = ({ workout }) => {
  const [editFormIsOpen, setEditFormIsOpen] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);

  function openEditForm() {
    setEditFormIsOpen(true);
  }

  function closeEditForm() {
    setEditFormIsOpen(false);
  }

  function openDeleteModal() {
    setDeleteModalIsOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalIsOpen(false);
  }

  return (
    <>
      {editFormIsOpen
        ? createPortal(
            <ModalFormBg closeModal={closeEditForm}>
              <div>EDITING</div>
            </ModalFormBg>,
            document.querySelector('#modal_root')
          )
        : null}

      {deleteModalIsOpen
        ? createPortal(
            <ModalFormBg closeModal={closeDeleteModal}>
              <div>DELETING</div>
            </ModalFormBg>,
            document.querySelector('#modal_root')
          )
        : null}

      <div className="bg-background dark:bg-background-dark text-gray-700 dark:text-gray-100 rounded p-3">
        <h2 className="font-bold text-center mb-3">
          Workout - {formatDate(workout.date)}
        </h2>
        {workout.exercises.map((exercise) => (
          <>
            <div className="h-[1px] bg-primary" />
            <ExerciseTable exercise={exercise} />
          </>
        ))}
        <div className="flex gap-2 justify-end">
          <GenericButton func={openEditForm} text="Edit" className="open-button" />
          <GenericButton func={openDeleteModal} text="Delete" className="open-button" />
        </div>
      </div>
    </>
  );
};

export default Activity;
