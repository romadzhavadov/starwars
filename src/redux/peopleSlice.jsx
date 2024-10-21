import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPeople = createAsyncThunk(
  'people/fetchPeople',
  async (page) => {

    // Request to receive people data
    try {
        const res = await fetch(`https://sw-api.starnavi.io/people/?page=${page}`); 
        const data = await res.json(); 
        console.log(data); 
        return data
    } catch (error) {
        console.log('Error fetching data:', error); 
    }
  },
)

const peopleSlice = createSlice({
  name: 'people',
  initialState: {
      data: null,
      isloading: false,
      page: 1,
      error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
        builder.addCase(fetchPeople.pending, (state) => {
          state.isloading = true;
        });
    
        builder.addCase(fetchPeople.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isloading = false;
            state.error = null;
        });

        builder.addCase(fetchPeople.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
})

export const { setPage } = peopleSlice.actions

export default peopleSlice.reducer