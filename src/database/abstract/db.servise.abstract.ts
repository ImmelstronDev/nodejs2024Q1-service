import { User } from 'src/user/entities/user.entity';
import { GenericBD } from './genericDB.abstract';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { Album } from 'src/album/entities/album.entity';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';

export abstract class DBService {
  readonly users: GenericBD<User, UpdateUserDto>;
  readonly artists: GenericBD<Artist, CreateArtistDto>;
  readonly tracks: GenericBD<Track, CreateTrackDto>;
  readonly albums: GenericBD<Album, CreateAlbumDto>;
}
