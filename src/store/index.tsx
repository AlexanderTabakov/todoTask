import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";

export interface IData {
  id: number;
  // title: string;  //TODO не забыть убрать закоменченный код и исправить типы
  attributes: IItem;
}
export interface IItem {
  id?: number;
  title: string;
  description: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface IState {
  data: IData[];
  loading: boolean;
  hasErrors: boolean;
  getData?: () => Promise<void>;
  /// TODO разобраться с типами!!!!
  // addTask?: (newTodo: IItem) => Promise<void>;
  addTask?: any;
  sortByActive?: () => void;
  sortByCompleted?: () => void;
  reset?: () => void;
  copiedData: IData[];
  copyData: () => void;
  favoriteTodos?: IItem[];
  // addToFavorite?:(newTodo: IItem) => void;
  addToFavorite?: any;
  removeFromFavorite?: (id: number) => void;
  sortByFav?: () => void;
  // sortByFav?:any,
  deleteTodo?: (id: number) => void;
  changeStatus?: (id: number, item: IItem) => Promise<void>;
  nextPage?: number;
}

const useStore = create(
  persist(
    devtools<IState>((set, get) => ({
      data: [],
      copiedData: [],
      favoriteTodos: [],
      loading: false,
      hasErrors: false,
      nextPage: 0,

      getData: async () => {
        set(() => ({ loading: true }));
        try {
          const nextPage = get().nextPage;
          const response = await axios.get(
            `https://cms.dev-land.host/api/tasks?pagination%5BwithCount%5D=true&pagination%5Bpage%5D=${nextPage}`,
          );

          set((state: IState) => ({
            data: (state.data = response.data.data),
            loading: false,
            nextPage: state.nextPage + 1,
          }));
        } catch (err) {
          set(() => ({ hasErrors: true, loading: false }));
        }
      },

      deleteTodo: async (id: number) => {
        set(() => ({ loading: true }));
        try {
          const response = await axios.delete(
            `https://cms.dev-land.host/api/tasks/${id}`,
          );
        } catch (err) {
          set(() => ({ hasErrors: true, loading: false }));
        }
      },

      changeStatus: async (id: number, item: IItem) => {
        const { title, description, status } = item;
        const test = { data: { title, description, status } };
        // set(() => ({ loading: true }));
        try {
          const response = await axios.put(
            `https://cms.dev-land.host/api/tasks/${id}`,
            test,
          );
        } catch (err) {
          set(() => ({ hasErrors: true, loading: false }));
        }
      },

      copyData: () => {
        set((state: IState) => ({ copiedData: state.data }));
      },

      sortByActive() {
        const sortByActive = get().data.filter(
          (a) => a.attributes.status === "active",
        );
        set({ copiedData: sortByActive });
      },

      sortByCompleted() {
        const sortCompleted = get().data.filter(
          (a) => a.attributes.status === "completed",
        );
        set({ copiedData: sortCompleted });
      },

      sortByFav() {
        // @ts-ignore
        set((copiedData) => ({ copiedData: get().favoriteTodos }));
      },

      reset: () => {
        set((state: IState) => ({ copiedData: state.data }));
      },

      addTask: async (newTodo: IItem) => {
        // set(() => ({ loading: true }));  // TODO убрать комменты

        try {
          const response = await axios.post(
            "https://cms.dev-land.host/api/tasks",
            newTodo,
          );
        } catch (err) {
          set(() => ({ hasErrors: true, loading: false }));
        }
      },

      addToFavorite(newTodo: IItem) {
        const favTest = [...get().favoriteTodos, newTodo];
        set({ favoriteTodos: favTest });
      },

      removeFromFavorite(id: number) {
        const removeFav = [...get().favoriteTodos.filter((t) => t.id !== id)];
        set({ favoriteTodos: removeFav });
      },
    })),
    {
      name: "todos-storage",
      partialize: (state) => ({
        test: state.favoriteTodos,
        test2: state.addToFavorite,
        test3: state.sortByFav,
        test4: state.removeFromFavorite,
      }),
    },
  ),
);

// useStore.getState().getData();
// useStore.getState().copyData();

export default useStore;
