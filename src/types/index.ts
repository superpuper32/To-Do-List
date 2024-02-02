export type TTask = {
  id: string;
  title: string;
  description: string;
  created: string;
};

export type TModalType = 'adding' | 'editing' | 'removing';

export type TModal = {
    task: TTask;
    type: TModalType | null;
}

export type TComponentProps = {
    modal: TModal;
    hideModal(): void;
    updateTasks(fn: (tasks: TTask[]) => void): void;
};

export type TRenderTask = {
  task: TTask;
  showModal(type: string, task?: TTask | null): void;
};
