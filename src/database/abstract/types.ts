import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { Album } from 'src/album/entities/album.entity';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { Track } from 'src/track/entities/track.entity';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';

export type DBPayload =
  | UpdateAlbumDto
  | UpdateArtistDto
  | UpdateTrackDto
  | UpdateUserDto;

export type DBEntity = Album | Artist | Track | User;
