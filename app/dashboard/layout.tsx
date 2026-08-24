import { DashShell } from '@/components/dashboard/dash-shell'

/**
 * The dashboard area.
 *
 * Every page under here is indexable on purpose: this is a public demo with mock data,
 * and the working dashboard is the single most persuasive thing the template has. There
 * is nothing private to keep out of the index.
 */
export default function DashboardLayout({ children }: LayoutProps<'/dashboard'>) {
  return <DashShell>{children}</DashShell>
}
