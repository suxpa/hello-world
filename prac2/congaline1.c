/* pipe.c		

 */
#include	<stdio.h>
#include	<unistd.h>
#define	oops(m,x)	{ perror(m); exit(x); }

main(int ac, char **av)
{
	int newpipe[2],oldpipe[2];
	char *command[]=NULL;
	int buffersize=50;
	char buffer[buffersize];
	int commandCounter=0;
	
	getline(&buffer,&buffersize,stdin);
	printf("%s\n",buffer);
}
