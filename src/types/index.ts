export type TTask = {
  id: string;
  title: string;
  description: string;
  created: string;
};

export type TNewTask = Omit<TTask, "id">;

export type TModalType = "adding" | "editing" | "removing";

export type TModal = {
    task: TTask;
    type: TModalType;
}

export type TComponentProps = {
    modal: TModal;
    hideModal(): void;
};

export type TRenderTask = {
  task: TTask;
  showRemoveModal(task: TTask): void;
  showEditModal(task: TTask): void;
};
