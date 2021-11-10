export interface Task {
    id: number;
    name: string;
    // Dirctors
    processorId: number;
    projectId: number;
    // Task Group
    epicId: number;
    panelId: number;
    // Task or Bug
    typeId: number;
    note: string;
}