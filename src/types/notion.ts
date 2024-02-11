export interface NotionDB {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: CreatedBy;
  last_edited_by: LastEditedBy;
  cover: any;
  icon: Icon;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
  public_url: any;
}

export interface CreatedBy {
  object: string;
  id: string;
}

export interface LastEditedBy {
  object: string;
  id: string;
}

export interface Icon {
  type: string;
  external: External;
}

export interface External {
  url: string;
}

export interface Parent {
  type: string;
  database_id: string;
}

export interface Properties {
  "Type of content": TypeOfContent;
  Status: Status;
  "Publish date": PublishDate;
  링크: GeneratedType;
  Name: Name;
}

export interface TypeOfContent {
  id: string;
  type: string;
  select: Select;
}

export interface Select {
  id: string;
  name: "Coding Test" | "Blog";
  color: string;
}

export interface Status {
  id: string;
  type: string;
  status: Status2;
}

export interface Status2 {
  id: string;
  name: string;
  color: string;
}

export interface PublishDate {
  id: string;
  type: string;
  date: Date;
}

export interface Date {
  start: string;
  end: any;
  time_zone: any;
}

export interface GeneratedType {
  id: string;
  type: string;
  rich_text: RichText[];
}

export interface RichText {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: string;
}

export interface Text {
  content: string;
  link: Link;
}

export interface Link {
  url: string;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Name {
  id: string;
  type: string;
  title: Title[];
}

export interface Title {
  type: string;
  text: Text2;
  annotations: Annotations2;
  plain_text: string;
  href: any;
}

export interface Text2 {
  content: string;
  link: any;
}

export interface Annotations2 {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}
