export const githubContributorsListQueryOptions = {
  queryKey: ["github", "contributors-list"],
  staleTime: 60_000,
  queryFn: async () => {
    const response = await fetch("https://api.github.com/repos/miravaorg/mirava/contributors")
    const data = await response.json()

    return data as Array<Contributor>
  }
}

type Contributor = {
  login: string,
  id: number,
  node_id: string,
  avatar_url: string,
  gravatar_id: string,
  url: string,
  html_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  starred_url: string,
  subscriptions_url: string,
  organizations_url: string,
  repos_url: string,
  events_url: string,
  received_events_url: string,
  type: string,
  user_view_type: string,
  site_admin: boolean,
  contributions: number
}