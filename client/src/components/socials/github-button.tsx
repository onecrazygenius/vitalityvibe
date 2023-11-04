import { Icons } from '@/components/icons'

export function GithubButton() {
    return (
        <a
		  href="/"
		  className="underline underline-offset-4"
		>
		  Github
		  <Icons.github className="inline-block w-4 h-4 ml-1" />
	  	</a>
    )
}