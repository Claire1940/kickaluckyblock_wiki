import { getLatestArticles } from '@/lib/getLatestArticles'
import { buildModuleLinkMap } from '@/lib/buildModuleLinkMap'
import type { Language } from '@/lib/content'
import HomePageClient from './HomePageClient'

const HOME_EXTERNAL_LINKS = {
	video: {
		id: '14Adm06VEBE',
		title: 'ROBLOX KICK A LUCKY BLOCK!',
	},
	links: {
		playRoblox: 'https://www.roblox.com/games/89469502395769/Kick-a-Lucky-Block',
		joinDiscord: 'https://discord.com/invite/tfwUnqvdUX',
		developerGroup: 'https://www.roblox.com/communities/1041977165/No-More-Flops',
		youtubeVideo: 'https://www.youtube.com/watch?v=14Adm06VEBE',
	},
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
	const { locale } = await params

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)
  const moduleLinkMap = await buildModuleLinkMap(locale as Language)

	return (
		<HomePageClient
			latestArticles={latestArticles}
			moduleLinkMap={moduleLinkMap}
			locale={locale}
			homeExternalLinks={HOME_EXTERNAL_LINKS}
		/>
	)
}
