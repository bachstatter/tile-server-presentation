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
            <p>
              Hi, my name is Joachim
              Bachstatter, today I'm
              talking about building a
              tile server in node.js
            </p>
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
                needed ot be updated
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
                that knowledge
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
              check out our webpage
              small.mu and read some
              about.
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
              Any way, before we jump in
              to figure out how to build
              a tile server I thought it
              might be worth while to
              talk about some general
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
                work with is:
              </p>
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
              <p>
                Geojson is an
                specification of how to
                structure json for
                geospatial data. So as
                you probably can guess
                this is very web
                friendly.
              </p>
              <p>
                You can represent
                everything from points
                to MultiPolygons
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
            <ul>
              <li>
                Just like normal json
                it's a bit repatitve and
                in my opnion file size
                if the biggest drawback
              </li>
              <li>
                Anyway this is how
                geojson looks:
              </li>
            </ul>
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
              So what is topojson then?
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
              <p>
                Topojson is also a json
                specification
              </p>
              <p>
                It tries to tackle the
                file size problem of
                geojson. To acheive that
                it reuses geometries.
                This means that is not
                as readable for us
                humans.
              </p>
              <p>
                Another slitgly annoying
                things is that most map
                libraries dont support
                topojson, this means
                that usally the server
                sends topojson and the
                first thing you do on
                the client is to convert
                it to geojson.
              </p>
              <p>
                Depdending on the
                dataset you get large
                savings so its def
                worthwhile.
              </p>
            </div>
          }
        >
          <Heading>Topojson</Heading>
        </Slide>
        <Slide>
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
            <p>
              Shapes files are a very
              common dataformat as well.
              Its not json based and
              also not as web friendly.
              Usually I'll convert it to
              topo or geojson.
            </p>
          }
        >
          <Heading>Shapefiles</Heading>
        </Slide>
        <Slide
          notes={
            <div>
              <p>
                Some handy tool for
                viewing and processing
                geospatial data.
              </p>
              <p>
                Qgis is a open soruce
                desktop application.
                Very powerful. A bit
                overwhelming but can do
                most things
              </p>
              <p>
                mapshaper, sorta the
                opposite of qgis. easy
                to use. Drag and drop
                interface. Lets you view
                shapefiles online
              </p>
              <p>
                ogr2ogr, CLI with ltos
                of feature. Aslo useful
                for importing data into
                geospatal databases.
              </p>
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
        <Slide>
          <Image
            width={'100%'}
            height={'100%'}
            src={images.qgis}
          />
        </Slide>
        <Slide>
          <iframe
            style={{
              width: '100%',
              height: '90vh',
            }}
            src={
              'https://mapshaper.org/'
            }
          />
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
        />
        <Slide
          notes={
            <p>
              So the question is what to
              do when the data is too
              large
            </p>
          }
        >
          <List>
            <ListItem>
              Shapefile, not very web
              friendly
            </ListItem>
            <ListItem>
              Data is small ➡️ geojson
            </ListItem>
            <ListItem>
              Data is a little bit
              bigger ➡️ topojson
            </ListItem>
          </List>
        </Slide>
        <Slide
          notes={
            <p>
              First step, simlify: All
              the tools mentioned before
              has different way of
              simplifying the geometeric
              shapes. Unfortunately
              there's not one rule that
              get it perfect every time
              instead you have to play
              around with different
              algorithms and how hard
              they should be aplied till
              it fits your usecase.
            </p>
          }
        >
          <Heading>Simplify</Heading>
        </Slide>
        <Slide
          notes={
            <p>
              We can prerposs the data
              and remove geometries and
              propteries not needed for
              our use case
            </p>
          }
        >
          <Heading>Preprocess</Heading>
        </Slide>
        <Slide
          notes={
            <p>
              A library that makes that
              easy is turf.js
            </p>
          }
        >
          <Heading>turf.js</Heading>
        </Slide>
        <Slide
          notes={
            <div>
              <p>
                These are all useful
                tools but in some cases
                you have even more
                requirements. You
                dataset might too large
                or you need more
                flexibility.
              </p>
              <p>
                When you look at maps
                loading you have
                probably seen that it's
                loading square images,
                or tiles. A tile server
                is a server that serves
                these images.
              </p>
            </div>
          }
        >
          <Heading>
            Building a tile server.
          </Heading>
        </Slide>
        <Slide>
          <Heading
            notes={
              <div>
                <p>
                  There are mainly two
                  types of tiles, raster
                  tiles and vector
                  tiles. Vector tiles is
                  a little more fancy
                  and sorta the new way.
                  I prefer them because
                  you get to style your
                  tiles client side
                  whereas raster tiles
                  is styles from the
                  tile server it self.
                </p>
                <p>
                  It's also faster since
                  the tiles get send as
                  binary data and you
                  only get the data that
                  is currently in view.
                  The tile server we
                  gonna create is gonna
                  generate vector tiles.
                  in the MVT format.
                  That stands for Mapbox
                  vector tiles.
                </p>
              </div>
            }
          >
            Raster vs Vector tiles
          </Heading>
        </Slide>
        <Slide
          note={
            <p>
              MVT tiles are an open
              standard under a Creative
              Commons Attribution 3.0 US
              License
            </p>
          }
        >
          <Heading>
            Mapbox Vector Tiles
          </Heading>
        </Slide>
        <Slide>
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
            <p>
              Most of you probably heard
              about postgres, it's and
              open source very popular
              SQL database. PostGis is a
              postgress extention that
              gives postgres geospatioal
              capabilities.
            </p>
          }
        >
          <Heading>
            Postgres with Postgis
          </Heading>
        </Slide>
        <Slide
          notes={
            <p>
              There's is a lot I could
              talk about to say about
              postgis. It can do all the
              things we saw qgis and
              ogr2ogr can do. That is
              simplyfying, manipulating,
              querying etc.
            </p>
          }
        >
          <Heading>Postgis</Heading>
        </Slide>

        <CodeSlide
          lang="js"
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
          notes={`Although we want to display things on a map. So instead of getting the name of a super hero we want the geometry.
          Postgis also comes with ST_AsMVT function when gives us maptiles directly. Very handy indeed`}
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
                I dont have to explain
                express. But what we
                gonna do is create one
                route width a few
                params. Position on the
                x, y, z axis. These are
                all the number we needed
                to figure out a tile
                what should be in a
                tile. Frontend map
                library will
                automatically make new
                request with these
                numbers as you pan and
                zoom.
              </li>
              <li>
                The route handler
                function it, self is
                quite easy. We call a
                very convienent function
                called createVectorTile.
                We give it the sql we
                want it to execute and
                the x,y,z coords. This
                will give us back a
                vector tile in a
                protobuf format and we
                just pass that a long to
                the client.
              </li>
            </ul>
          }
        />
        <Slide
          notes={
            <p>
              For the ones that still
              following a long you might
              noticed that I didn't use
              postgis mvt tiles
              function. There's a reason
              for that.
            </p>
          }
        >
          <Text textColor="tertiary">
            createVectorTile()
          </Text>
          <Image src={images.curious} />
        </Slide>
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
            <p>
              So now we gonna start
              using a library called
              mapnik. I'm using Mapnik
              for optimisations. Mapnik,
              according to themselves
              has lightning-fast
              cartographic algorithms.
              Its a c++ ibrary with a
              node package.
            </p>
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
              But when we zoom out we it
              just looks like one line.
              In this example it
              probably would matter if
              we always got geometry for
              three lines. But if we had
              millions of lines it's a
              make it or break it
              situation.
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
            <ul>
              <li>
                This is a very powerful
                function that we will be
                able to resuse a lot.
                The first thing we do is
                require(mapnik) and
                install default plugins.
              </li>
              <li>
                This is the projection
                we're going to use. That
                is the Pseudo Spherical
                Mercator. I don't know
                much about how it works,
                more than its the
                defacto standard for
                maps on the web.
              </li>
              <li>
                Time to create our
                function, we take the
                sql and xyz coordinates
                as argument.
              </li>
              <li>
                After that the first we
                gonna do is setup our
                database connection. You
                need all the usual stuff
                you need to connect to a
                db.
              </li>
              <li>
                We also specify a table
                propetery. Here we could
                just give it a name of a
                table in our database.
                But you can also define
                a subquery, which is
                what makes this function
                so flexible.
              </li>
              <li>
                Now that we have our
                config setup lets create
                our tile. First the
                create a map. Saying how
                large our tile should be
                and what projection to
                use
              </li>
              <li>
                Then we create a layer.
                Give it a name and the
                same projection again.
              </li>

              <li>
                After that we create a
                datasource using our db
                config and attach it to
                the layer.
              </li>
              <li>
                Next we attach the layer
                to the map and create a
                vector tile. With the
                map and the tile create
                we're ready to render.
              </li>
              <li>
                The apis are a callback
                based so lets wrap it in
                a promise.
              </li>
              <li>
                With that down we call
                render to create the
                tile. and then getData
                to convert it to a
                buffer and return.
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
            <p>
              Another nice aspect of is
              that this is just a normal
              express server so we
              leverage our existing
              knowledge of cahnging. We
              can add a cahche header to
              the repsonse and put all
              tiles in redis. I reccomed
              putting the generated
              tiles in redis since
              querying geo data nad
              generating tiles is very
              quite hard work for the
              server.
            </p>
          }
        >
          <Heading>Caching</Heading>
        </Slide>
        <Slide
          notes={
            <p>
              That was all I had for you
              tonight. I'll happily try
              to answer question if you
              have any.
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
