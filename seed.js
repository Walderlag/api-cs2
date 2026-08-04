import { connectDB } from './src/data/database.js';
import { getDb } from './src/data/db.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const caixas = [
  {
    nome: "Kilowatt Case",
    colecao: "Kilowatt",
    skins: [
      { weapon: "AK-47", name: "Inheritance", rarity: "Covert" },
      { weapon: "AWP", name: "Chrome Cannon", rarity: "Covert" },
      { weapon: "M4A1-S", name: "Black Lotus", rarity: "Classified" },
      { weapon: "USP-S", name: "Jawbreaker", rarity: "Classified" },
      { weapon: "Zeus x27", name: "Olympus", rarity: "Classified" },
      { weapon: "M4A4", name: "Etch Lord", rarity: "Restricted" },
      { weapon: "Glock-18", name: "Block-18", rarity: "Restricted" },
      { weapon: "Five-SeveN", name: "Hybrid", rarity: "Restricted" },
      { weapon: "MP7", name: "Just Smile", rarity: "Restricted" },
      { weapon: "Sawed-Off", name: "Analog Input", rarity: "Restricted" },
      { weapon: "Dual Berettas", name: "Hideout", rarity: "Mil-Spec" },
      { weapon: "MAC-10", name: "Light Box", rarity: "Mil-Spec" },
      { weapon: "Nova", name: "Dark Sigil", rarity: "Mil-Spec" },
      { weapon: "SSG 08", name: "Dezastre", rarity: "Mil-Spec" },
      { weapon: "Tec-9", name: "Slag", rarity: "Mil-Spec" },
      { weapon: "UMP-45", name: "Motorized", rarity: "Mil-Spec" },
      { weapon: "XM1014", name: "Irezumi", rarity: "Mil-Spec" },
      { weapon: "Kukri Knife", name: "Vanilla / Fade / Crimson Web", rarity: "Rare Special" },
    ]
  },
  {
    nome: "Revolution Case",
    colecao: "Revolution",
    skins: [
      { weapon: "AK-47", name: "Head Shot", rarity: "Covert" },
      { weapon: "M4A4", name: "Temukau", rarity: "Covert" },
      { weapon: "AWP", name: "Duality", rarity: "Classified" },
      { weapon: "MAC-10", name: "Sakkaku", rarity: "Classified" },
      { weapon: "P90", name: "Neoqueen", rarity: "Classified" },
      { weapon: "M4A1-S", name: "Emphorosaur-S", rarity: "Restricted" },
      { weapon: "Glock-18", name: "Umbral Rabbit", rarity: "Restricted" },
      { weapon: "R8 Revolver", name: "Banana Cannon", rarity: "Restricted" },
      { weapon: "P2000", name: "Wicked Sick", rarity: "Restricted" },
      { weapon: "SG 553", name: "Cyberforce", rarity: "Restricted" },
      { weapon: "MAG-7", name: "Insomnia", rarity: "Mil-Spec" },
      { weapon: "MP9", name: "Featherweight", rarity: "Mil-Spec" },
      { weapon: "P250", name: "Re.built", rarity: "Mil-Spec" },
      { weapon: "SCAR-20", name: "Fragments", rarity: "Mil-Spec" },
      { weapon: "Tec-9", name: "Rebel", rarity: "Mil-Spec" },
      { weapon: "MP5-SD", name: "Liquidation", rarity: "Mil-Spec" },
      { weapon: "M249", name: "Downtown", rarity: "Mil-Spec" },
      { weapon: "Clutch Gloves", name: "Vice / Snow Leopard", rarity: "Rare Special" },
    ]
  },
  {
    nome: "Dreams & Nightmares Case",
    colecao: "Dreams & Nightmares",
    skins: [
      { weapon: "AK-47", name: "Nightwish", rarity: "Covert" },
      { weapon: "MP9", name: "Starlight Protector", rarity: "Covert" },
      { weapon: "Dual Berettas", name: "Melondrama", rarity: "Classified" },
      { weapon: "FAMAS", name: "Rapid Eye Movement", rarity: "Classified" },
      { weapon: "MP7", name: "Abyssal Apparition", rarity: "Classified" },
      { weapon: "M4A1-S", name: "Night Terror", rarity: "Restricted" },
      { weapon: "USP-S", name: "Ticket to Hell", rarity: "Restricted" },
      { weapon: "PP-Bizon", name: "Space Cat", rarity: "Restricted" },
      { weapon: "G3SG1", name: "Dream Glade", rarity: "Restricted" },
      { weapon: "XM1014", name: "Zombie Offensive", rarity: "Restricted" },
      { weapon: "SCAR-20", name: "Poultrygeist", rarity: "Mil-Spec" },
      { weapon: "MAG-7", name: "Foresight", rarity: "Mil-Spec" },
      { weapon: "P2000", name: "Lifted Spirits", rarity: "Mil-Spec" },
      { weapon: "MP5-SD", name: "Necro Jr.", rarity: "Mil-Spec" },
      { weapon: "Five-SeveN", name: "Scrawl", rarity: "Mil-Spec" },
      { weapon: "MAC-10", name: "Ensnared", rarity: "Mil-Spec" },
      { weapon: "Sawed-Off", name: "Spirit Board", rarity: "Mil-Spec" },
      { weapon: "Gamma Knives", name: "Butterfly / Huntsman / Falchion", rarity: "Rare Special" },
    ]
  },
  {
    nome: "Gallery Case",
    colecao: "Gallery",
    skins: [
      { weapon: "M4A1-S", name: "Vaporwave", rarity: "Covert" },
      { weapon: "Glock-18", name: "Gold Toof", rarity: "Covert" },
      { weapon: "UMP-45", name: "Neo-Noir", rarity: "Classified" },
      { weapon: "P250", name: "Epicenter", rarity: "Classified" },
      { weapon: "AK-47", name: "The Outsiders", rarity: "Classified" },
      { weapon: "SSG 08", name: "Rapid Transit", rarity: "Restricted" },
      { weapon: "P90", name: "Randy Rush", rarity: "Restricted" },
      { weapon: "MAC-10", name: "Saibā Oni", rarity: "Restricted" },
      { weapon: "M4A4", name: "Turbine", rarity: "Restricted" },
      { weapon: "Dual Berettas", name: "Hydro Strike", rarity: "Restricted" },
      { weapon: "AUG", name: "Luxe Trim", rarity: "Mil-Spec" },
      { weapon: "Desert Eagle", name: "Calligraffiti", rarity: "Mil-Spec" },
      { weapon: "M249", name: "O.S.P.", rarity: "Mil-Spec" },
      { weapon: "MP5-SD", name: "Statics", rarity: "Mil-Spec" },
      { weapon: "R8 Revolver", name: "Tango", rarity: "Mil-Spec" },
      { weapon: "SCAR-20", name: "Trailblazer", rarity: "Mil-Spec" },
      { weapon: "USP-S", name: "027", rarity: "Mil-Spec" },
      { weapon: "Kukri Knife", name: "Vanilla / Fade / Crimson Web", rarity: "Rare Special" },
    ]
  },
  {
    nome: "Fracture Case",
    colecao: "Fracture",
    skins: [
      { weapon: "Desert Eagle", name: "Printstream", rarity: "Covert" },
      { weapon: "AK-47", name: "Legion of Anubis", rarity: "Covert" },
      { weapon: "M4A4", name: "Tooth Fairy", rarity: "Classified" },
      { weapon: "Glock-18", name: "Vogue", rarity: "Classified" },
      { weapon: "XM1014", name: "Entombed", rarity: "Classified" },
      { weapon: "MAC-10", name: "Allure", rarity: "Restricted" },
      { weapon: "Galil AR", name: "Connexion", rarity: "Restricted" },
      { weapon: "Tec-9", name: "Brother", rarity: "Restricted" },
      { weapon: "MP5-SD", name: "Kitbash", rarity: "Restricted" },
      { weapon: "MAG-7", name: "Monster Call", rarity: "Restricted" },
      { weapon: "SG 553", name: "Ol' Rusty", rarity: "Mil-Spec" },
      { weapon: "SSG 08", name: "Mainframe 001", rarity: "Mil-Spec" },
      { weapon: "P250", name: "Cassette", rarity: "Mil-Spec" },
      { weapon: "P90", name: "Freight", rarity: "Mil-Spec" },
      { weapon: "PP-Bizon", name: "Runic", rarity: "Mil-Spec" },
      { weapon: "Negev", name: "Ultralight", rarity: "Mil-Spec" },
      { weapon: "P2000", name: "Gnarled", rarity: "Mil-Spec" },
      { weapon: "Shattered Web Knives", name: "Skeleton / Nomad / Survival / Paracord", rarity: "Rare Special" },
    ]
  }
];

async function seed() {
  try {
    console.log('🌱 Iniciando seed...');
    await connectDB();
    const db = getDb();
    await db.collection('users').createIndex({ email: 1 }, { unique: true });

    // Admin
    const adminExistente = await db.collection('users').findOne({ role: 'admin' });
    if (!adminExistente) {
      const senhaHash = await bcrypt.hash('admin123', 10);
      await db.collection('users').insertOne({
        email: 'admin@cs2.com',
        senha: senhaHash,
        role: 'admin',
        criadoEm: new Date(),
        tentativasFalhas: 0,
        bloqueadoAte: null
      });
      console.log('✅ Admin criado — admin@cs2.com / admin123');
    } else {
      console.log('⚠️  Admin já existe');
    }

    // Caixas e Skins
    // Chaves primeiro (para usar os IDs nas caixas)
    const totalChaves = await db.collection('chaves').countDocuments();
    let chavesMap = {};
    if (totalChaves === 0) {
      const chavesParaCriar = [
        { nome: 'Chave Kilowatt', quantidade: 10 },
        { nome: 'Chave Revolution', quantidade: 10 },
        { nome: 'Chave Dreams & Nightmares', quantidade: 10 },
        { nome: 'Chave Gallery', quantidade: 10 },
        { nome: 'Chave Fracture', quantidade: 10 },
      ];
      const chavesResult = await db.collection('chaves').insertMany(chavesParaCriar);
      chavesMap = {
        'Kilowatt': chavesResult.insertedIds[0],
        'Revolution': chavesResult.insertedIds[1],
        'Dreams & Nightmares': chavesResult.insertedIds[2],
        'Gallery': chavesResult.insertedIds[3],
        'Fracture': chavesResult.insertedIds[4],
      };
      console.log('✅ Chaves criadas (50 no total)');
    } else {
      console.log('⚠️  Chaves já existem');
      // Se chaves já existem, buscar seus IDs
      const chavesCriadas = await db.collection('chaves').find({}).toArray();
      chavesCriadas.forEach(chave => {
        if (chave.nome.includes('Kilowatt')) chavesMap['Kilowatt'] = chave._id;
        if (chave.nome.includes('Revolution')) chavesMap['Revolution'] = chave._id;
        if (chave.nome.includes('Dreams')) chavesMap['Dreams & Nightmares'] = chave._id;
        if (chave.nome.includes('Gallery')) chavesMap['Gallery'] = chave._id;
        if (chave.nome.includes('Fracture')) chavesMap['Fracture'] = chave._id;
      });
    }

    const totalCaixas = await db.collection('caixas').countDocuments();
    if (totalCaixas === 0) {
      for (const caixa of caixas) {
        const resultCaixa = await db.collection('caixas').insertOne({
          nome: caixa.nome,
          colecao: caixa.colecao,
          chave_id: chavesMap[caixa.colecao]
        });

        const skinsParaInserir = caixa.skins.map(s => ({
          arma: s.weapon,
          nome_skin: s.name,
          raridade: s.rarity,
          caixa_id: resultCaixa.insertedId
        }));

        await db.collection('skins').insertMany(skinsParaInserir);
        console.log(`✅ ${caixa.nome} criada com ${caixa.skins.length} skins`);
      }
    } else {
      console.log('⚠️  Caixas já existem');
    }

    // Inventário do admin com algumas skins (para demonstração)
    const adminUser = await db.collection('users').findOne({ role: 'admin' });
    if (adminUser) {
      const inventarioExistente = await db.collection('inventario').countDocuments({ userId: adminUser._id.toString() });

      if (inventarioExistente === 0) {
        const skins = await db.collection('skins').find({}).limit(3).toArray();

        for (const skin of skins) {
          await db.collection('inventario').insertOne({
            userId: adminUser._id.toString(),
            skinId: skin._id,
            arma: skin.arma,
            nome_skin: skin.nome_skin,
            raridade: skin.raridade,
            caixa_id: skin.caixa_id,
            obtidoEm: new Date()
          });
        }
        console.log('✅ Inventário do admin populado com 3 skins de exemplo');
      } else {
        console.log('⚠️  Inventário do admin já possui skins');
      }
    }

    console.log('\n🎉 Seed concluído! Rode: npm run dev');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error);
    process.exit(1);
  }
}

seed();
