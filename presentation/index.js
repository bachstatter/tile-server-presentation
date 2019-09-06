// Import React
import React from 'react'

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Link,
  Image,
  Code,
  Appear,
} from 'spectacle'
import CodeSlide from 'spectacle-code-slide'
// Import image preloader util
import preloader from 'spectacle/lib/utils/preloader'

// Import theme
import createTheme from 'spectacle/lib/themes/default'

// Require CSS
require('normalize.css')
require('spectacle/lib/themes/default/index.css')

const images = {
  qgis: require('../assets/img/qgis.png'),
  curious: require('../assets/img/curios.gif'),
  tfv: require('../assets/img/tfv.png'),
  tfv2: require('../assets/img/tfv2.png'),
  zoomedIn: require('../assets/img/zoomed-in.png'),
  zoomedOut: require('../assets/img/zoomed-out.png'),
  mapshaper: require('../assets/img/mapshaper.png'),
}

preloader(Object.values(images))

const theme = createTheme(
  {
    primary: '#1F2022',
    secondary: '#CECECE',
    tertiary: '#edcc30',
    quartenary: '#CECECE',
  },
  {
    primary: 'Helvetica',
    secondary: 'Helvetica',
  }
)

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['zoom', 'slide']}
        transitionDuration={500}
        theme={theme}
      >
        <Slide
          transition={['zoom']}
          bgColor="primary"
          notes={
            <div>
              <p>
                Hi, my name is Joachim
                Bachstatter, today I'm
                talking about building a
                tile server in node.js.
              </p>
              <p>
                I work at{' '}
                <a href="https://smallmultiples.com.au/">
                  Small Multiples
                </a>
                , and you can find me on
                Twitter at{' '}
                <a href="https://twitter.com/bachstatter">
                  @bachstatter
                </a>
              </p>
            </div>
          }
        >
          <Heading
            size={1}
            fit
            caps
            lineHeight={1}
            textColor="secondary"
          >
            Building a tile server in
            Node.js
          </Heading>

          <Text
            margin="10px 0 0"
            textColor="tertiary"
            bold
          >
            @bachstatter
          </Text>
          <Link
            style={{ display: 'block' }}
            margin="20px 0 0"
            padding="20px 0 0"
            bold
          >
            https://small.mu
          </Link>
        </Slide>
        <Slide
          transition={['fade']}
          bgColor="primary"
          notes={
            <div>
              <p>
                Recently I've been
                working a big project
                for Transport in
                Victoria
              </p>
              <p>
                It was a big dashboard
                with over 10 different
                maps.
              </p>
              <p>
                Large datasets that
                needed to be updated
                from a data management
                system.
              </p>
              <p>
                Where one part was
                building a tile server
              </p>
              <p>
                I learnt a lot so I
                thought I share some of
                that knowledge.
              </p>
            </div>
          }
        >
          <Heading
            size={1}
            fit
            caps
            lineHeight={1}
            textColor="secondary"
          >
            Purpose of this talk
          </Heading>
        </Slide>
        <Slide
          transition={['fade']}
          bgColor="primary"
          notes={
            <p>
              Unfortunately it's not a
              public project, but if
              you're curious you can
              check out our webpage{' '}
              <a href="https://smallmultiples.com.au/projects/visualising-public-transport-and-private-vehicle-trips-around-victoria/">
                small.mu projects page
              </a>
              &nbsp;and read about it.
            </p>
          }
        >
          <Link>
            https://small.mu/projects
          </Link>

          <Image
            width={'100%'}
            height={'100%'}
            src={images.tfv}
          ></Image>
        </Slide>
        <Slide
          transition={['fade']}
          bgColor="primary"
          notes={
            <p>
              Anyway, before we jump in
              to how to build a tile
              server, I thought it might
              be worthwhile talking
              about some general
              geospatial data concepts.
            </p>
          }
        >
          <Link>
            https://small.mu/projects
          </Link>

          <Image
            width={'100%'}
            height={'100%'}
            src={images.tfv2}
          ></Image>
        </Slide>
        <Slide
          transition={['fade']}
          bgColor="primary"
          notes={
            <div>
              <p>
                Lets start with some
                data formats.
              </p>
              <p>
                Common data formats I
                work with are:
              </p>
              <ul>
                <li>Geojson</li>
                <li>Topojson</li>
                <li>Shapefile</li>
              </ul>
            </div>
          }
        >
          <Heading>Data format</Heading>
          <List>
            <ListItem>Geojson</ListItem>
            <ListItem>
              Topojson
            </ListItem>
            <ListItem>
              Shapefile
            </ListItem>
          </List>
        </Slide>
        <Slide
          transition={['fade']}
          bgColor="primary"
          notes={
            <div>
              <h2>Geojson</h2>
              <p>
                Geojson is a
                specification for how to
                structure json for
                geospatial data. So as
                you can probably guess,
                this is very web
                friendly.
              </p>
              <p>
                You can represent
                everything from points
                to MultiPolygons.
              </p>
            </div>
          }
        >
          <Heading>Geojson</Heading>
          <List>
            <ListItem>Points</ListItem>
            <ListItem>
              LineString
            </ListItem>
            <ListItem>Polygon</ListItem>
            <ListItem>
              MultiPoint
            </ListItem>
            <ListItem>
              MultiLineString
            </ListItem>
            <ListItem>
              MultiPolygon
            </ListItem>
          </List>
        </Slide>

        <CodeSlide
          lang="js"
          code={require('raw-loader!../assets/geojson')}
          notes={
            <div>
              <h2>Geojson drawbacks</h2>
              <ul>
                <li>
                  Just like normal json,
                  it's a bit repetitive.
                  In my opinion file
                  size is the biggest
                  drawback of this
                  format.
                </li>
                <li>
                  Anyway this is how
                  geojson looks:
                </li>
                <li>
                  <code>
                    (Press the down key
                    to check it out!)
                  </code>
                </li>
              </ul>
            </div>
          }
          ranges={[
            {
              loc: [0, 0],
              title: 'Geojson',
            },
            { loc: [1, 4] },
            { loc: [4, 11] },
            { loc: [5, 8] },
            { loc: [9, 10] },
          ]}
        />
        <Slide
          notes={
            <p>
              So what is Topojson then?
            </p>
          }
        >
          <Heading>Data format</Heading>
          <List>
            <ListItem
              style={{
                textDecoration:
                  'line-through',
              }}
            >
              Geojson
            </ListItem>
            <ListItem>
              Topojson
            </ListItem>
            <ListItem>
              Shapefile
            </ListItem>
          </List>
        </Slide>
        <Slide
          notes={
            <div>
              <h2>Topojson</h2>
              <p>
                Topojson is also a json
                specification
              </p>
              <p>
                It tries to tackle the
                file size problem of
                geojson. To achieve that
                it reuses geometries.
                This means that is not
                as readable for us
                humans.
              </p>
              <p>
                Another slightly
                annoying things is that
                most map libraries dont
                support topojson, which
                means that usually the
                server sends topojson
                and the first thing you
                do on the client is to
                convert it to geojson.
              </p>
              <p>
                Depending on the dataset
                you get large savings
                though, so it's
                definitely worthwhile.
              </p>
            </div>
          }
        >
          <Heading>Topojson</Heading>
        </Slide>
        <Slide
          notes={
            <p>Now on to shapefiles.</p>
          }
        >
          <Heading>Data format</Heading>
          <List>
            <ListItem
              style={{
                textDecoration:
                  'line-through',
              }}
            >
              Geojson
            </ListItem>
            <ListItem
              style={{
                textDecoration:
                  'line-through',
              }}
            >
              Topojson
            </ListItem>
            <ListItem>
              Shapefile
            </ListItem>
          </List>
        </Slide>
        <Slide
          notes={
            <div>
              <h3>Shapefiles</h3>
              <p>
                <a href="https://en.wikipedia.org/wiki/Shapefile">
                  Shapefile
                </a>{' '}
                is a very common data
                format as well. It's not
                json-based and also not
                as web friendly. Usually
                I'll convert it to
                topojson or geojson.
              </p>
            </div>
          }
        >
          <Heading>Shapefiles</Heading>
        </Slide>
        <Slide
          notes={
            <div>
              <h3>Handy tools</h3>
              <p>
                Some handy tool for
                viewing and processing
                geospatial data:
              </p>
              <ul>
                <li>
                  <b>Qgis</b> is an open
                  source desktop
                  application. It's very
                  powerful and can do
                  most things, but it's
                  a bit overwhelming.
                </li>
                <li>
                  <b>Mapshaper</b> is
                  sortof the opposite of
                  qgis. It's easy to
                  use, has a drag and
                  drop interface, and
                  lets you view
                  shapefiles online.
                </li>
                <li>
                  <b>ogr2ogr</b>, a CLI
                  with lots of features.
                  Also useful for
                  importing data into
                  geospatal databases.
                </li>
              </ul>
            </div>
          }
        >
          <Heading>Handy tools</Heading>
          <List>
            <ListItem>QGIS</ListItem>
            <ListItem>
              https://mapshaper.org/
            </ListItem>
            <ListItem>ogr2ogr</ListItem>
          </List>
        </Slide>
        <Slide
          notes={
            <div>
              <h3>QGIS interface</h3>
            </div>
          }
        >
          <Image
            width={'100%'}
            height={'100%'}
            src={images.qgis}
          />
        </Slide>
        <Slide
          notes={
            <div>
              <h3>
                Mapshaper interface
              </h3>
            </div>
          }
        >
          <Image
            width={'100%'}
            height={'100%'}
            src={images.mapshaper}
          ></Image>
        </Slide>
        <CodeSlide
          lang="js"
          code={require('raw-loader!../assets/ogr2ogr')}
          ranges={[
            {
              loc: [0, 7],
              title: 'ogr2ogr',
            },
          ]}
          notes={
            <div>
              <h3>Using OGR in Node</h3>
            </div>
          }
        />
        <Slide
          notes={
            <p>
              So the question is: What
              to do when the data gets
              too large?
            </p>
          }
        >
          <List>
            <ListItem>
              Shapefile, not very web
              friendly
            </ListItem>
            <ListItem>
              Data is small ➡️ use
              geojson
            </ListItem>
            <ListItem>
              Data is a little bit
              bigger ➡️ use topojson
            </ListItem>
            <ListItem>
              But what about when it's
              too big for topojson?
            </ListItem>
          </List>
        </Slide>
        <Slide
          notes={
            <div>
              <h3>Simplify</h3>
              <p>
                First step, simplify:
                All the tools I've
                mentioned before have
                different ways of
                simplifying the
                geometeric shapes.
              </p>
              <p>
                Unfortunately there's
                not one rule that gets
                it perfect every time.
                Instead you have to play
                around with different
                algorithms and how they
                should be applied (what
                level of granularity and
                compression you require)
                until it fits your use
                case.
              </p>
            </div>
          }
        >
          <Heading>Simplify</Heading>
        </Slide>
        <Slide
          notes={
            <div>
              <h3>Preprocessing</h3>
              <p>
                We can preprocess the
                data and remove
                geometries and
                properties that are not
                needed for our use case
              </p>
            </div>
          }
        >
          <Heading>Preprocess</Heading>
        </Slide>
        <Slide
          notes={
            <p>
              A library that makes that
              very easy is turf.js. I
              won't go into that in
              detail here, but you can{' '}
              <a href="https://turfjs.org/">
                read up about it.
              </a>
            </p>
          }
        >
          <Heading>turf.js</Heading>
        </Slide>
        <Slide
          notes={
            <div>
              <h3>
                Building a tile server
              </h3>
              <p>
                These are all useful
                tools but in some cases
                you might have even more
                requirements. You
                dataset might too large
                for example, or you need
                more flexibility.
              </p>
              <p>
                When you look at maps
                loading, you've probably
                seen that it's loading
                square images, or{' '}
                <i>tiles</i>. A tile
                server is a server that
                serves these images.
              </p>
            </div>
          }
        >
          <Heading>
            Building a tile server.
          </Heading>
        </Slide>
        <Slide
          notes={
            <div>
              <h3>
                Raster vs Vector tiles
              </h3>
              <p>
                There are mainly two
                types of tiles, raster
                tiles and vector tiles.
                Vector tiles are a
                little more fancy and
                definitely the hotter
                new technology. I prefer
                them because you get to
                style your tiles client
                side, whereas raster
                tiles are styled on the
                tile server itself.
              </p>
              <p>
                Vector tiles After also
                faster, since the tiles
                are sent as binary data
                and you only get the
                data that's currently in
                view. The tile server
                we're going to create
                now is going to generate
                vector tiles, in the MVT
                format. That stands for
                Mapbox Vector Tiles.
              </p>
            </div>
          }
        >
          <Heading>
            Raster vs Vector tiles
          </Heading>
        </Slide>
        <Slide
          notes={
            <div>
              <h3>
                Mapbox Vector Tiles
              </h3>
              <p>
                MVT tiles are an open
                standard, released under
                a Creative Commons
                Attribution 3.0 US
                License
              </p>
            </div>
          }
        >
          <Heading>
            Mapbox Vector Tiles
          </Heading>
        </Slide>
        <Slide
          notes={
            <div>
              <h3>
                Tech for building a tile
                server
              </h3>
              <ul>
                <li>
                  Postgres with PostGis
                  extention
                </li>
                <li>
                  Node.js with
                  express.js
                </li>
                <li>mapnik</li>
                <li>
                  redis (for caching)
                </li>
              </ul>
            </div>
          }
        >
          <Heading>
            Tech for building a tile
            server
          </Heading>
          <List>
            <ListItem>
              Postgres with PostGis
              extention
            </ListItem>
            <ListItem>
              Node.js with express.js
            </ListItem>
            <ListItem>mapnik</ListItem>
            <ListItem>
              redis (caching)
            </ListItem>
          </List>
        </Slide>
        <Slide
          notes={
            <div>
              <h3>
                Postgres with PostGis
              </h3>
              <p>
                Most of you probably
                heard about postgres,
                it's an open source very
                popular SQL database.
                PostGis is a postgres
                extention that gives
                postgres geospatial
                capabilities.
              </p>
            </div>
          }
        >
          <Heading>
            Postgres with Postgis
          </Heading>
        </Slide>
        <Slide
          notes={
            <div>
              <h3>PostGis</h3>
              <p>
                There's a lot to say
                about postgis. It can do
                all the things we saw
                qgis and ogr2ogr do:
                simplifying,
                manipulating, querying
                and so on.
              </p>
            </div>
          }
        >
          <Heading>Postgis</Heading>
        </Slide>

        <CodeSlide
          lang="js"
          notes={
            <div>
              <h3>SQL example</h3>
              <p>
                It's quite hard to come
                up with simple examples
                that show you everything
                PostGis can do. This
                example is from the
                postgis site.
              </p>
              <p>
                As you can see it's
                normal sql, but we do
                use a function called
                St_Contains.
              </p>
              <p>
                <code>St_Contains</code>{' '}
                allows you to query
                whether one geometry is
                contained within another
                geometry (place).
              </p>
            </div>
          }
          code={require('raw-loader!../assets/superhero-sql')}
          ranges={[
            {
              loc: [0, 5],
              title: 'SQL',
            },
          ]}
        />
        <CodeSlide
          lang="js"
          code={require('raw-loader!../assets/mvt-sql')}
          ranges={[{ loc: [0, 2] }]}
          notes={
            <p>
              Though we want to display
              things on a map. So we're
              not interested in the name
              of the superhero, we're
              interested in his or her
              geometry. Postgis also
              comes with a{' '}
              <code>ST_AsMVT</code>
              function which gives us
              maptiles directly (MVT,
              again, being a Mapbox
              Vector Tile). Very handy
              indeed!
            </p>
          }
        />
        <Slide>
          <Heading>
            Tech for building a tile
            server
          </Heading>
          <List>
            <ListItem
              style={{
                textDecoration:
                  'line-through',
              }}
            >
              Postgres with PostGis
              extention
            </ListItem>
            <ListItem>
              Node.js with express.js
            </ListItem>
            <ListItem>mapnik</ListItem>
            <ListItem>
              redis (caching)
            </ListItem>
          </List>
        </Slide>

        <CodeSlide
          lang="js"
          code={require('raw-loader!../assets/express')}
          ranges={[
            { loc: [0, 1] },
            { loc: [1, 2] },
            { loc: [2, 6] },
            { loc: [6, 12] },
            { loc: [0, 13] },
          ]}
          notes={
            <ul>
              <li>
                I'm sure I don't have to
                explain express to you.
                We'll start off by
                creating one route with
                a few params: the x, y
                and z co-ordinates of
                the map view we want.
                These are the only
                numbers we needed to
                figure out what should
                be in a tile. The
                frontend map library
                will automatically make
                new requests with these
                numbers as you pan and
                zoom.
              </li>
              <li>
                The route handler
                function itself is quite
                easy. We call a very
                convenient function
                called createVectorTile.
                We give it the sql we
                want it to execute and
                the x,y,z coordinates.
                This will give us back a
                vector tile in a
                protobuf format and we
                just pass that along to
                the client.
              </li>
            </ul>
          }
        />
        <Slide>
          <Heading>
            Tech for building a tile
            server
          </Heading>
          <List>
            <ListItem
              style={{
                textDecoration:
                  'line-through',
              }}
            >
              Postgres with PostGis
              extention
            </ListItem>
            <ListItem
              style={{
                textDecoration:
                  'line-through',
              }}
            >
              Node.js with express.js
            </ListItem>
            <ListItem>mapnik</ListItem>
            <ListItem>
              redis (caching)
            </ListItem>
          </List>
        </Slide>
        <Slide
          notes={
            <div>
              <h3>Mapnik</h3>
              <p>
                So now we're going to
                start using a library
                called mapnik. I'm using
                Mapnik for
                optimisations. Mapnik,
                (according to
                themselves) have
                "lightning-fast
                cartographic
                algorithms". It's a c++
                ibrary with a node
                package.
              </p>
            </div>
          }
        >
          <Heading>Mapnik</Heading>
        </Slide>
        <Slide
          notes={
            <p>
              Here we have a map with
              three lines.
            </p>
          }
        >
          <Image
            width={'100%'}
            height={'100%'}
            src={images.zoomedIn}
          />
        </Slide>
        <Slide
          notes={
            <p>
              But when we zoom out, it
              just looks like one line.
              Mapnik would optimise this
              view so only one vector
              line is sent to the
              client. In this case with
              only three lines, that's
              not a big deal. But if we
              had millions of lines,
              that would be a
              make-or-break situation.
            </p>
          }
        >
          <Image
            width={'100%'}
            height={'100%'}
            src={images.zoomedOut}
          />
        </Slide>
        <CodeSlide
          lang="js"
          code={require('raw-loader!../assets/createVectorTile')}
          ranges={[
            {
              loc: [0, 2],
              title:
                'createVectorTile.js',
            },
            { loc: [1, 2] },
            { loc: [2, 5] },
            { loc: [5, 6] },
            { loc: [6, 12] },
            { loc: [12, 13] },
            { loc: [6, 14] },
            { loc: [14, 15] },
            { loc: [15, 16] },
            { loc: [16, 19] },
            { loc: [19, 20] },
            { loc: [20, 23] },
            { loc: [14, 23] },
            { loc: [24, 25] },
            { loc: [25, 30] },
          ]}
          notes={
            <div>
              <h3>
                createVectorTile.js
              </h3>
              <code>
                Press your down button
                to see the code!
              </code>
              <ul>
                <li>
                  This is a very
                  powerful function that
                  we will be able to
                  resuse a lot. The
                  first thing we do is
                  require(mapnik) and
                  install default
                  plugins.
                </li>
                <li>
                  The{' '}
                  <code>
                    const proj4
                  </code>{' '}
                  line is the projection
                  we're going to use. In
                  this case, it's Pseudo
                  Spherical Mercator. I
                  don't know much about
                  how it works, other
                  than it's the defacto
                  standard for maps on
                  the web.
                </li>
                <li>
                  Time to create our
                  function, we take the
                  sql and xyz
                  coordinates as
                  argument.
                </li>
                <li>
                  After that the first
                  thing we're going to
                  do is set up our
                  database connection.
                  You need all the usual
                  stuff you need to
                  connect to a db.
                </li>
                <li>
                  We also specify a
                  table property. Here
                  we could just give it
                  a name of a table in
                  our database. But you
                  can also define a
                  subquery, which is
                  what makes this
                  function so flexible.
                </li>
                <li>
                  Now that we have our
                  config set up, lets
                  create our tile. First
                  we create a map,
                  saying how large our
                  tile should be and
                  what projection to
                  use.
                </li>
                <li>
                  Then we create a
                  layer, give it a name
                  and the same
                  projection again.
                </li>

                <li>
                  After that we create a
                  datasource using our
                  db config and attach
                  it to the layer.
                </li>
                <li>
                  Next we attach the
                  layer to the map and
                  create a vector tile.
                  With the map and the
                  tile created we're
                  ready to render.
                </li>
                <li>
                  The apis are callback
                  based, so lets wrap it
                  in a promise.
                </li>
                <li>
                  With that task down,
                  we call render to
                  create the tile, and
                  then getData to
                  convert it to a buffer
                  and return.
                </li>
              </ul>
            </div>
          }
        />
        <Slide>
          <Heading>
            Tech for building a tile
            server
          </Heading>
          <List>
            <ListItem
              style={{
                textDecoration:
                  'line-through',
              }}
            >
              Postgres with PostGis
              extention
            </ListItem>
            <ListItem
              style={{
                textDecoration:
                  'line-through',
              }}
            >
              Node.js with express.js
            </ListItem>
            <ListItem
              style={{
                textDecoration:
                  'line-through',
              }}
            >
              mapnik
            </ListItem>
            <ListItem>
              redis (caching)
            </ListItem>
          </List>
        </Slide>
        <Slide
          transition={['fade']}
          notes={
            <div>
              <h3>Caching</h3>
              <p>
                A nice aspect of using a
                normal express server is
                that we can leverage our
                existing knowledge of
                caching. We can add a
                cache header to the
                repsonse and put all
                tiles in redis. I
                recommend putting the
                generated tiles in
                redis, since querying
                geodata and generating
                tiles is quite hard work
                for the server.
              </p>
            </div>
          }
        >
          <Heading>Caching</Heading>
        </Slide>
        <Slide
          notes={
            <p>
              That's all I have for you
              tonight. I'll happily try
              to answer questions if you
              have any!
            </p>
          }
          transition={['fade']}
          bgColor="tertiary"
        >
          <Heading
            fit
            textColor="primary"
          >
            Thanks
          </Heading>
          <Link
            style={{
              marginTop: 20,
              display: 'block',
              color: '#718ec8',
            }}
            href="https://twitter.com/bachstatter"
          >
            @bachstatter
          </Link>
          <Link
            style={{
              marginTop: 20,
              display: 'block',
              color: '#718ec8',
            }}
            href="http://tile-server-presentation.surge.sh"
          >
            tile-server-presentation.surge.sh
          </Link>
        </Slide>
      </Deck>
    )
  }
}
