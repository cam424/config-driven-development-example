import Link from "next/link";

export default function ResultsDashboard(props) {
  return (
    <ul className="divide-y divide-gray-100">
      {props.forms && props.forms.length > 0 ? (
        props.forms.map((form, index) => (
          <li key={`${form.name || index}-section`} className="relative flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {form.name} Section
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
              {form.status === 'Not Started' && (
                <Link href={form.slug}>Begin Section</Link>
              )}
              {form.status === 'In Progress' && (
                <Link href={form.slug}>Continue Editing</Link>
              )}
              {form.status === 'Submitted' && (
                <span className="text-green-500">Complete</span>
              )}
            </div>
          </li>
        ))
      ) : (
        <li>Loading data...</li>
      )}
    </ul>
  )
}