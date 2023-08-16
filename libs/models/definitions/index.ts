import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "@/libs/db";
import { UUIDV4 } from "@sequelize/core/types/dialects/abstract/data-types";

interface Address
  extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
  id: UUIDV4;
  address: string;
}

interface Content
  extends Model<InferAttributes<Content>, InferCreationAttributes<Content>> {
  id: UUIDV4;
  title: string;
  description: string;
  url: string;
}

interface ContentAddress
  extends Model<
    InferAttributes<ContentAddress>,
    InferCreationAttributes<ContentAddress>
  > {
  content_id: UUIDV4;
  address_id: UUIDV4;
}

interface Log
  extends Model<InferAttributes<Log>, InferCreationAttributes<Log>> {
  id: UUIDV4;
  log: Date;
}

interface User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id: UUIDV4;
  name: string;
  email: string;
  password: string;
}

const Address = sequelize.define<Address>(
  "Address",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "addresses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

const Content = sequelize.define<Content>(
  "Content",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "contents",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

const ContentAddress = sequelize.define<ContentAddress>(
  "ContentAddress",
  {
    content_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Content,
        key: "id",
      },
    },
    address_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Address,
        key: "id",
      },
    },
  },
  {
    tableName: "content_addresses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export const Log = sequelize.define<Log>(
  "Log",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    log: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "logs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export const User = sequelize.define<User>(
  "User",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Address.belongsToMany(Content, {
  through: ContentAddress,
  foreignKey: "address_id",
});

Content.belongsToMany(Address, {
  through: ContentAddress,
  foreignKey: "content_id",
});

export { Address, Content, ContentAddress };
