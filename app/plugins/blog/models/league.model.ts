export type LeagueCountryModelType = Model<ILeagueCountry>

const leagueCountrySchema = new Schema <ILeagueCountry, LeagueCountryModelType> ({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure category names are unique
    trim: true,
  },
});

export type LeagueModelType = Model<ILeague>

const leagueSchema = new Schema <ILeague, LeagueModelType> ({
name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'LeagueCountry',
      required: true, // Ensure each league is linked to a country
    },
});

export const LeagueCountryModel: LeagueCountryModelType = mongoose.models.LeagueCountry || mongoose.model('LeagueCountry', leagueCountrySchema);

export const LeagueModel: LeagueModelType = mongoose.models.League || mongoose.model('League', leagueSchema);
