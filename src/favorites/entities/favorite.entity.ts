import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class FavoriteEntity {
  @ApiProperty({
    type: [Artist],
  })
  artists: Artist[];
  @ApiProperty({
    type: [Track],
  })
  tracks: Track[];
  @ApiProperty({
    type: [Album],
  })
  albums: Album[];
}
