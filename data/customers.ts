/** Mock customer accounts for the DataTable on /dashboard/customers. */

export type CustomerStatus = 'active' | 'trialing' | 'past_due' | 'churned'
export type CustomerPlan = 'Free' | 'Pro' | 'Team'

export interface Customer {
  id: string
  company: string
  contact: string
  email: string
  /** i.pravatar.cc is seeded by this id, so the same face comes back on every build. */
  avatarSeed: number
  plan: CustomerPlan
  status: CustomerStatus
  /** Monthly recurring revenue in USD. */
  mrr: number
  seats: number
  /** ISO date. Rendered as plain text — a relative time here would age oddly in a table. */
  signedUp: string
  country: string
}

export const STATUS_LABEL: Record<CustomerStatus, string> = {
  active: 'Active',
  trialing: 'Trialing',
  past_due: 'Past due',
  churned: 'Churned',
}

/** Maps a status onto a Badge `tone`, so severity reads without the label. */
export const STATUS_TONE: Record<CustomerStatus, 'success' | 'primary' | 'warning' | 'neutral'> = {
  active: 'success',
  trialing: 'primary',
  past_due: 'warning',
  churned: 'neutral',
}

export const CUSTOMERS: readonly Customer[] = [
  { id: 'c_01', company: 'Northwind Labs', contact: 'Amara Okafor', email: 'amara@northwind.dev', avatarSeed: 12, plan: 'Team', status: 'active', mrr: 1840, seats: 42, signedUp: '2024-03-14', country: 'Nigeria' },
  { id: 'c_02', company: 'Fathom Robotics', contact: 'Jonas Weber', email: 'jonas@fathom.io', avatarSeed: 24, plan: 'Team', status: 'active', mrr: 1620, seats: 38, signedUp: '2024-05-02', country: 'Germany' },
  { id: 'c_03', company: 'Bluecrest Health', contact: 'Priya Raman', email: 'priya@bluecrest.health', avatarSeed: 31, plan: 'Pro', status: 'active', mrr: 890, seats: 19, signedUp: '2024-06-21', country: 'India' },
  { id: 'c_04', company: 'Lumen Freight', contact: 'Diego Salas', email: 'diego@lumenfreight.com', avatarSeed: 45, plan: 'Pro', status: 'past_due', mrr: 740, seats: 16, signedUp: '2024-01-09', country: 'Chile' },
  { id: 'c_05', company: 'Kettle & Co', contact: 'Rowan Fitzgerald', email: 'rowan@kettle.co', avatarSeed: 58, plan: 'Pro', status: 'active', mrr: 690, seats: 14, signedUp: '2024-08-30', country: 'Ireland' },
  { id: 'c_06', company: 'Aster Financial', contact: 'Mei Lin Chen', email: 'meilin@asterfin.com', avatarSeed: 63, plan: 'Team', status: 'active', mrr: 2140, seats: 55, signedUp: '2023-11-17', country: 'Singapore' },
  { id: 'c_07', company: 'Grove Interactive', contact: 'Tobias Nkemelu', email: 'tobias@grove.gg', avatarSeed: 7, plan: 'Free', status: 'trialing', mrr: 0, seats: 3, signedUp: '2025-07-28', country: 'Kenya' },
  { id: 'c_08', company: 'Halcyon Media', contact: 'Sofia Bergström', email: 'sofia@halcyon.media', avatarSeed: 19, plan: 'Pro', status: 'active', mrr: 810, seats: 17, signedUp: '2024-09-11', country: 'Sweden' },
  { id: 'c_09', company: 'Ridgeline Solar', contact: 'Marcus Bell', email: 'marcus@ridgeline.energy', avatarSeed: 36, plan: 'Team', status: 'trialing', mrr: 0, seats: 28, signedUp: '2025-08-04', country: 'Australia' },
  { id: 'c_10', company: 'Verdant Foods', contact: 'Isabelle Moreau', email: 'isabelle@verdant.fr', avatarSeed: 42, plan: 'Pro', status: 'churned', mrr: 0, seats: 0, signedUp: '2023-08-23', country: 'France' },
  { id: 'c_11', company: 'Cobalt Studio', contact: 'Kenji Watanabe', email: 'kenji@cobalt.design', avatarSeed: 51, plan: 'Pro', status: 'active', mrr: 620, seats: 12, signedUp: '2024-12-05', country: 'Japan' },
  { id: 'c_12', company: 'Meridian Legal', contact: 'Grace Adeyemi', email: 'grace@meridian.legal', avatarSeed: 15, plan: 'Team', status: 'active', mrr: 1980, seats: 47, signedUp: '2024-02-28', country: 'United Kingdom' },
  { id: 'c_13', company: 'Tidepool Games', contact: 'Elena Volkova', email: 'elena@tidepool.gg', avatarSeed: 27, plan: 'Free', status: 'trialing', mrr: 0, seats: 5, signedUp: '2025-08-12', country: 'Estonia' },
  { id: 'c_14', company: 'Sable Logistics', contact: 'Omar Haddad', email: 'omar@sable.ae', avatarSeed: 33, plan: 'Pro', status: 'past_due', mrr: 560, seats: 11, signedUp: '2024-04-19', country: 'UAE' },
  { id: 'c_15', company: 'Juniper Retail', contact: 'Hannah Kowalski', email: 'hannah@juniper.shop', avatarSeed: 48, plan: 'Team', status: 'active', mrr: 1730, seats: 40, signedUp: '2024-07-07', country: 'Poland' },
  { id: 'c_16', company: 'Perch Analytics', contact: 'Samuel Mwangi', email: 'samuel@perch.africa', avatarSeed: 55, plan: 'Pro', status: 'active', mrr: 780, seats: 15, signedUp: '2025-01-23', country: 'Kenya' },
  { id: 'c_17', company: 'Anchor Point', contact: 'Clara Nogueira', email: 'clara@anchorpoint.br', avatarSeed: 61, plan: 'Free', status: 'churned', mrr: 0, seats: 0, signedUp: '2024-10-30', country: 'Brazil' },
  { id: 'c_18', company: 'Vellum Press', contact: 'Aaron Feldman', email: 'aaron@vellum.press', avatarSeed: 9, plan: 'Pro', status: 'active', mrr: 720, seats: 13, signedUp: '2025-02-14', country: 'Canada' },
  { id: 'c_19', company: 'Orchid Biotech', contact: 'Nadia Rahimi', email: 'nadia@orchidbio.com', avatarSeed: 22, plan: 'Team', status: 'active', mrr: 2260, seats: 61, signedUp: '2023-09-08', country: 'Netherlands' },
  { id: 'c_20', company: 'Basalt Mining', contact: 'Liam O Sullivan', email: 'liam@basalt.mine', avatarSeed: 39, plan: 'Pro', status: 'trialing', mrr: 0, seats: 9, signedUp: '2025-08-18', country: 'South Africa' },
]

/** Face for a customer row. Deterministic, so the avatars do not shuffle per build. */
export function avatarUrl(seed: number): string {
  return `https://i.pravatar.cc/80?img=${seed}`
}
