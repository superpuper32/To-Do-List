export type TTask = {
  id: string
  title: string
  description: string
  created: string
}

export type TModalName = 'adding' | 'editing' | 'removing'

export type TModal = {
    task: TTask
    type: TModalName | null
}

export type TComponentProps = {
    modal: TModal
    hideModal(): void
    updateTasks(fn: (tasks: TTask[]) => void): void
}

export type TRenderTask = {
  task: TTask
  showModal(type: string, task?: TTask | null): void
}

export interface TValues {
  title: string
  description: string
  created: string
}