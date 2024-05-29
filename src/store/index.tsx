import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {parse, stringify, toJSON, fromJSON} from 'flatted'
import axios from "axios";

export interface IData {
    id: number;
    // title: string;  //TODO не забыть убрать закоменченный код и исправить типы
    attributes: IItem;
    // attributes: any;
}
export interface IItem {
    id?:number,
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
    // addTask?: (newTask: IItem) => void;
    addTask?: any,
    removeTask?: (id: number) => void;
    sortByActive?:any
    sortByCompleted?:any
    reset?:any,
    copiedData:any,
    copyData:any,
    favoriteTodos?:any,
    addToFavorite?:any
    removeFromFavorite?:any,
    sortByFav?:any,
    deleteTodo?: any,

}

const useStore = create(

    persist(
    devtools<IState>((set, get) => ({
        data: [],
        copiedData: [],
        favoriteTodos:[],
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


        deleteTodo: async (id:number) => {
            set(() => ({ loading: true }));
            try {
                const response = await axios.delete(
                    `https://cms.dev-land.host/api/tasks/${id}`,
                );

            } catch (err) {
                set(() => ({ hasErrors: true, loading: false }));
            }
        },

        copyData: () => {
            set((state:IState) => ({ copiedData: (state.data) }));
        },

        // sortByActive (){
        //     const sortByActive = get().copiedData.sort((a:any, b:any)=> a.attributes.status < b.attributes.status);
        //     set({copiedData: sortByActive});
        // },
        //
        // sortByCompleted (){
        //     const sortCompleted = get().copiedData.sort((a:any, b:any)=> a.attributes.status > b.attributes.status);
        //     set({copiedData: sortCompleted});
        // },

        sortByActive (){
            const sortByActive = get().data.filter((a)=> a.attributes.status==='active');
            set({copiedData: sortByActive});
        },

        sortByCompleted (){
            const sortCompleted = get().data.filter((a)=> a.attributes.status==='completed');
            set({copiedData: sortCompleted});
        },


        sortByFav (){
            set((copiedData:any) => ({ copiedData: get().favoriteTodos }));
        },



        reset: () => {
            set((state:IState) => ({ copiedData: (state.data) }));
        },


        addTask:async (newTodo:IItem) => {
            set(() => ({ loading: true }));
            try {
                const response = await axios.post(
                    "https://cms.dev-land.host/api/tasks", newTodo

                );

            } catch (err) {
                set(() => ({ hasErrors: true, loading: false }));
            }
        },


        addToFavorite(newTodo:IItem) {
            const favTest = [...get().favoriteTodos, newTodo]
            set({favoriteTodos: favTest });
        },

        removeFromFavorite (id:number) {
            const  removeOrder = [...get().favoriteTodos.filter((t:IData)=>t.id!==id) ]
            set({favoriteTodos:removeOrder})
        },



    })),
        {
            // name: 'yourApp', // optional, name to use for localStorage key
            name: "todos-storage",
            // getStorage: () => sessionStorage
            // whitelist: ['data'], // optional, only data will be persisted //TODO разобраться с персистом
        }),
);

useStore.getState().getData();
useStore.getState().copyData();


export default useStore;
