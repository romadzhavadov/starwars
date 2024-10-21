import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchHeroWithFilmsAndStarships = createAsyncThunk(
  'hero/fetchHeroWithFilmsAndStarships',
  async (id) => {
    try {
      // Request to receive hero data
      const heroRes = await fetch(`https://sw-api.starnavi.io/people/${id}/`);
      const heroData = await heroRes.json();

      // Request to receive movies
      const filmsPromises = heroData.films.map(filmEpisode =>
        fetch(`https://sw-api.starnavi.io/films/${filmEpisode}/`).then(res => res.json())
      );
      const films = await Promise.all(filmsPromises);
  

      // Request for receiving spaceships
      const starshipsPromises = heroData.starships.map(starship =>
        fetch(`https://sw-api.starnavi.io/starships/${starship}/`).then(res => res.json())
      );
      const starships = await Promise.all(starshipsPromises);

      return { heroData, films, starships };
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }
);

const heroSlice = createSlice({
  name: 'hero',
  initialState: {
      data: null,
      films: [],
      starships: [],
      isloading: false,
      id: null,
      error: null,
  },
  reducers: {
    setHeroId: (state, action) => {
      state.id = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHeroWithFilmsAndStarships.pending, (state) => {
        state.isloading = true;
    });
    
    builder.addCase(fetchHeroWithFilmsAndStarships.fulfilled, (state, action) => {
      state.data = action.payload.heroData;
      state.films = action.payload.films;
      state.starships = action.payload.starships;
      state.isloading = false;
      state.error = null;
    });

    builder.addCase(fetchHeroWithFilmsAndStarships.rejected, (state, action) => {
      state.isloading = false; 
      state.error = action.error.message;
    });
  },
    
    
})

export const { setHeroId } = heroSlice.actions

export default heroSlice.reducer