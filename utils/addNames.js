const randomDisplayNames = [
  "CosmicCoder",
  "QuantumQueen",
  "JazzJellyfish",
  "PixelPirate",
  "GlitterGuru",
  "JavaJester",
  "NeonNinja",
  "DataDancer",
  "MoonlightMuse",
  "StarshipStreamer",
  "RubyRanger",
  "GalacticGladiator",
  "MysticMaestro",
  "SkylineSorcerer",
  "PolarisPirate",
  "AstroArtist",
  "QuantumQuokka",
  "ThunderTiger",
  "HarmonicHedgehog",
  "CircuitCyclops",
  "OceanOracle",
  "ScriptSorceress",
  "VividValkyrie",
  "ZenZeppelin",
  "DreamDragon",
  "FireFairy",
  "JungleJaguar",
  "SonicSphinx",
  "LaserLynx",
  "NebulaNomad",
  "TurboToucan",
  "PebblePhoenix",
  "BlazingButterfly",
  "WinterWolf",
  "RippleRhino",
  "CosmicCow",
  "DeltaDolphin",
  "PrairiePython",
  "InfiniteImpala",
  "AzureArmadillo",
  "EternalEagle",
  "WindWanderer",
  "DazzlingDingo",
  "MarbleMantis",
  "SolarSnail",
  "OrbitOwl",
  "KaleidoKangaroo",
  "FlareFlamingo",
  "HarborHusky",
  "NobleNarwhal",
  "JubilantJackal",
  "RadiantRaccoon",
  "GleamingGazelle",
  "IcyIguana",
  "DigitalDove",
  "FrostFalcon",
  "RegalRaven",
  "WarpWalrus",
  "QuasarQuail",
  "PermafrostPenguin",
  "MightyMoose",
  "OpticalOrca",
  "JollyJelly",
  "PixelPuma",
  "GalaxyGoose",
  "FleetFox",
  "MajesticMeerkat",
  "PlatinumPlatypus",
  "CoralCougar",
  "CrypticChameleon",
  "BlitzBison",
  "GoldenGrizzly",
  "TundraTiger",
  "FlashFrog",
  "ElementElephant",
  "WavyWombat",
  "PulsarPanda",
  "EpicEchidna",
  "SwiftSalamander",
  "RadiantRay",
  "FeralFerret",
  "InfernoIbex",
  "MysticalMoth",
  "BionicBadger",
  "OmegaOctopus",
  "PrismaticPanther",
  "ShimmerShark",
  "SupremeSeal",
  "WhimsicalWhale",
  "GlowingGiraffe",
  "ZephyrZebra",
  "VividVulture",
  "SpectralStork",
  "LunarLion",
  "SleekSloth",
  "CosmosCobra",
  "ChronoCheetah",
  "ElysiumEel",
  "LustrousLemur",
  "TitanicToucan",
  "MoltenMonkey",
  "HyperHippo",
  "NebulousNewt",
  "AstralAlligator",
  "ElixirEagle",
  "MirageManta",
  "GleamGecko",
  "SolarSwordfish",
  "WraithWalrus",
  "BurstingBear",
  "LavaLeopard",
  "WandererWeasel",
  "MagneticMoose",
  "RagingRam",
  "TimelessTurtle",
  "VortexViper",
  "CrescentCrow",
  "TidalTapir",
  "SearingSparrow",
  "CrystalCoyote",
  "HorizonHawk",
  "EtherealErmine",
  "NovaNightingale",
  "SkySquirrel",
  "StellarStingray",
  "QuantumQuetzal",
  "ArcaneArcher",
  "LunarLynx",
  "MysticMongoose",
  "CyberneticCivet",
  "SonicSnipe",
  "PrimalPeacock",
  "PyroPeregrine",
  "TropicalTarpon",
  "MiracleMockingbird",
  "CatalystCrane",
  "SurgeSawfish",
  "AtomicAlbatross",
  "RapidRat",
  "WondrousWren",
  "FlashyFlicker",
  "AquaAlpaca",
  "BlinkingBat",
  "CelestialCondor",
  "RadiantRook",
  "BurningBuzzard",
  "VelvetVireo",
  "MajesticMallard",
  "BeamingBaldEagle",
  "MightyMagpie",
  "GracefulGrouse",
  "SymphonicSwan",
  "SleekSkylark",
  "VividVireo",
  "HolographicHarrier",
  "BlazingBluebird",
  "PrismaticPuffin",
  "ElementalEgret",
  "NobleNuthatch",
  "JubilantJunco",
  "VividVireo",
  "PhantomPelican",
  "ShimmeringShrike",
  "EpicEagle",
  "SpectacularSpoonbill",
  "RhythmicRoadrunner",
  "InfernalIbis",
  "AstralAvocet",
  "StellarStarling",
  "CosmicCuckoo",
  "LuminousLoon",
  "TimelessTeal",
  "SonicSandpiper",
  "GalacticGull",
  "EtherealEider",
  "PrismaticPigeon",
  "NobleNighthawk",
  "WondrousWarbler",
  "MysticalMynah",
  "InfiniteIbis",
  "EpicEgret",
  "IridescentIcterid",
  "RegalRedstart",
  "SpectralSparrow",
  "RadiantRedwing",
  "FantasyFalcon",
  "PhenomenalPhoebe"
];
const User = require('../server/models/userModel')
const URI = 'mongodb+srv://just-bobby:Domino17!@cluster0.tkib1.mongodb.net/sonar?'
const mongoose = require('mongoose')

mongoose.connect(URI)
  .then(() => console.log('DB CONNECT 🌴 '))
  .catch(err => console.log(err));

const addNames = async () => {
  const allUsers = await User.find()
  
  for (let i = 0; i < allUsers.length; i++) {
    const user = allUsers[i]
    if (user.displayName === undefined) {
      user.displayName = randomDisplayNames[i]
    }
    await user.save()
  }
}

addNames()