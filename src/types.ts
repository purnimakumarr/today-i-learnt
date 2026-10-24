export interface Fact {
  id: number;
  created_at: string;
  text: string;
  source: string;
  category: string;
  votesInteresting: number;
  votesMindblowing: number;
  votesFalse: number;
}

export type NewFact = Pick<Fact, 'text' | 'source' | 'category'>;

export type VoteColumn = 'votesInteresting' | 'votesMindblowing' | 'votesFalse';

export type SortOption = 'top' | 'newest' | 'mindblowing';

export interface Category {
  name: string;
  color: string;
}

export interface Database {
  public: {
    Tables: {
      facts: {
        Row: Fact;
        Insert: NewFact & Partial<Omit<Fact, keyof NewFact>>;
        Update: Partial<Fact>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}
