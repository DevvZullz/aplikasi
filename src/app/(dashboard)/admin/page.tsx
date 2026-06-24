import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const [users, jobs] = await Promise.all([
    db.user.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
    db.downloadJob.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Admin Panel</h1>

      <section>
        <h2 className="mb-3 font-medium">Users ({users.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
                <th className="pb-2">Nama</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-zinc-100 dark:border-zinc-800">
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-medium">Download Jobs ({jobs.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
                <th className="pb-2">Source</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Dibuat</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id} className="border-b border-zinc-100 dark:border-zinc-800">
                  <td className="py-2 truncate max-w-xs">{j.sourceUrl}</td>
                  <td className="py-2">{j.status}</td>
                  <td className="py-2">{j.createdAt.toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
