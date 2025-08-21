export default {
  client: "sqlite3", // define o cliente do banco de dados como SQLite
  connection: {
    filename: "./src/database/database.sqlite", // caminho do arquivo do banco de dados
  },
  useNullAsDefault: true, // usa null como padrão para valores não definidos
  migrations: {
    extension: "ts", // extensão dos arquivos de migração
    directory: "./src/database/migrations", // diretório onde as migrações estão local
  },
  seeds: {
    extension: "ts", // extensão dos arquivos de seeds
    directory: "./src/database/seeds", // diretório onde as seeds estão localizadas
  },
};
