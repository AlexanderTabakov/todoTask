import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export interface IData {
    id: number;
    // title: string;  //TODO не забыть убрать закоменченный код
    attributes: IItem[];
}
export interface IItem {
    title: string,
    description: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
}

export interface IState {
    data: IData[];
    loading: boolean;
    hasErrors: boolean;
    getData?: () => Promise<void>;
    postData?: any; /// TODO разобраться с типами!!!!
    // postData?: (task: IItem, id: number) => Promise<void>; /// TODO разобраться с типами!!!!
    addTask?: (newTask: IItem) => void;
    removeTask?: (id: number) => void;
}

const useStore = create(
    devtools<IState>((set, get) => ({
        data: [],
        loading: false,
        hasErrors: false,

        getData: async () => {
            set(() => ({ loading: true }));
            try {
                const response = await axios.get(
                    "https://cms.dev-land.host/api/tasks",
                );

                set((state: IState) => ({
                    data: (state.data = response.data.data),
                    loading: false,
                }));
            } catch (err) {
                set(() => ({ hasErrors: true, loading: false }));
            }
        },

        // addTask(newTask: IItem) {
        //     const columnIndex: any = get().data.findIndex(
        //         (d) => d.title === "Not Started",
        //     );
        //     if (columnIndex !== -1) {
        //         const newTasks = [...get().data[columnIndex].items, newTask];
        //         const newColumns = [
        //             ...get().data.slice(0, columnIndex),
        //             { ...get().data[columnIndex], items: newTasks },
        //             ...get().data.slice(columnIndex + 1),
        //         ];
        //         set({ data: newColumns });
        //     }
        // },

        // removeTask(id: number) {
        //     const newData = get().data.map((column) => ({
        //         ...column,
        //         items: column.items.filter((item) => item.id !== id),
        //     }));
        //     set({ data: newData });
        // },

        // postData: async (upDatedItems: IItem, id: number) => {
        //     set(() => ({ loading: true }));
        //     try {
        //         const response = await axios.put(
        //             `https://66374e40288fedf6937ffce3.mockapi.io/boards/${id}`,
        //             {
        //                 items: upDatedItems,
        //             },
        //
        //         );
        //
        //         // @ts-ignore
        //         set((state:IState) => ({
        //             data: state.data.map((column) =>
        //                 column.id === id ? { ...column, items: upDatedItems } : column
        //             ),
        //             loading: false,
        //         }));
        //
        //         set((state: IState) => ({
        //             loading: false,
        //         }));
        //     } catch (err) {
        //         set(() => ({ hasErrors: true, loading: false }));
        //     }
        // },
    })),
);

useStore.getState().getData();

export default useStore;
