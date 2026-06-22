import { db } from '@/lib/db';

export default async function AdminPage() {
  const [users, jobs] = await Promise.all([
    db.user.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
    db.downloadJob.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Admin Panel</h1>

      <section>
        <h2 className="mb-2 font-medium">Users</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-zinc-500"><th>Nama</th><th>Email</th><th>Role</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="py-1.5">{u.name}</td><td>{u.email}</td><td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="mb-2 font-medium">Download Jobs</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-zinc-500"><th>Source</th><th>Status</th><th>Dibuat</th></tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="truncate py-1.5 max-w-xs">{j.sourceUrl}</td>
                <td>{j.status}</td>
                <td>{j.createdAt.toLocaleString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
